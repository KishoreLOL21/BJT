import io

def extract_modules_and_topics(text: str) -> str:
    module_pattern = r"(Module\s*[-:]?\s*\d+)"
    topic_pattern = r"(?:Topic\s*[-:]?\s*\d+|\•|\-|\d+\.)\s*(.*)"

    modules = re.split(module_pattern, text, flags=re.IGNORECASE)
    output = ""
    
    for i in range(1, len(modules), 2):  # Step by 2: [text_before, Module-1, content1, Module-2, content2,...]
        module_title = modules[i].strip()
        module_content = modules[i + 1].strip()

        output += f"\n{module_title}:\n"
        topics = re.findall(topic_pattern, module_content, flags=re.IGNORECASE)
        for idx, topic in enumerate(topics, start=1):
            if topic.strip():
                output += f"  Topic - {idx}: {topic.strip()}\n"
    return output
