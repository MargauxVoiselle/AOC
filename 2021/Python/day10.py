#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Dec 10 08:26:36 2021

@author: margaux
"""

def part1(name):
    with open(name,'r') as file:
        data = file.readlines()
        bracket_count, crochet_count, curly_bracket_count, chevron_count = 0, 0, 0, 0
        illegal_char = [0, 0, 0, 0]
        for line in data:
            
            for element in line:
                print(element)
                if element == '(':
                    bracket_count = bracket_count+1
                elif element == ')':
                    bracket_count = bracket_count-1
                elif element == '[':
                    crochet_count = crochet_count+1
                elif element == ']':
                    crochet_count = crochet_count-1
                elif element == '{':
                    curly_bracket_count = curly_bracket_count+1
                elif element == '}':
                    curly_bracket_count = curly_bracket_count-1
                elif element == '<':
                    chevron_count = chevron_count+1
                elif element == '>':
                    chevron_count = chevron_count-1
                    
            illegal_char[0] = illegal_char[0]+bracket_count
            illegal_char[1] = illegal_char[1]+crochet_count
            illegal_char[2] = illegal_char[2]+curly_bracket_count
            illegal_char[3] = illegal_char[3]+chevron_count
            bracket_count, crochet_count, curly_bracket_count, chevron_count = 0, 0, 0, 0
            print(illegal_char)
        
part1("../data/puzzle10.txt")