import re

def extract_unsigned_numbers(input_file, output_file):
    with open(input_file, 'r') as f:
        source_code = f.read()

    pattern = r'\b\d+(\.\d+)?([Ee]\d+)?\b'
    numbers = re.findall(pattern, source_code)

    with open(output_file, 'w') as f:
        for number in numbers:
            f.write(f'（数字，{number[0]}）')

# 示例调用
extract_unsigned_numbers('input.txt', 'output.txt')
