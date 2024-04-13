import re

def extract_hidden_numbers(input_file):
    with open(input_file, 'r') as f:
        text = f.read()

    pattern = r'[ABCDEFGHIJK]{1,10}'
    numbers = re.findall(pattern, text)

    for i, number in enumerate(numbers):
        converted_number = ''
        for char in number:
            if char == 'A':
                converted_number += '0'
            elif char == 'B':
                converted_number += '1'
            elif char == 'C':
                converted_number += '2'
            elif char == 'D':
                converted_number += '3'
            elif char == 'E':
                converted_number += 'E'
            elif char == 'F':
                converted_number += '.'
            elif char == 'G':
                converted_number += '+'
            elif char == 'H':
                converted_number += '-'
            elif char == 'I':
                converted_number += '4'
            elif char == 'J':
                converted_number += '5'
            elif char == 'K':
                converted_number += '6'
            elif char == 'L':
                converted_number += '7'
            elif char == 'M':
                converted_number += '8'
            elif char == 'N':
                converted_number += '9'

        try:
            float(converted_number)
            print(f'（数字，{converted_number}）')
        except ValueError:
            pass

# 示例调用
extract_hidden_numbers('input.txt')
