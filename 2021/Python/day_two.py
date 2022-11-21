#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Dec  2 07:06:39 2021

@author: margaux
"""

def first_solve():
    name = '/Users/margaux/Documents/AdventofCode/2021/second_problem.txt'
    with open(name, 'rb') as file:
        data = file.readlines()
        depth, horizontal = 0, 0

        
        list = []
        for line in data:
            list.append(line)
        new_list = []
        for k in range(0, len(list)):
            new_list.append(list[k].decode("utf-8"))
        for l in range(0, len(new_list)):
            if 'forward' in new_list[l]:
                for i in new_list[l]:
                    if i not in {'f', 'o', 'r', 'w', 'a', 'r', 'd', ' ', '\n'}:
                        horizontal = horizontal+int(i)
            if 'up' in new_list[l]:
                for i in new_list[l]:
                    if i not in {'u', 'p', ' ', '\n'}:
                        depth = depth-int(i)  
            if 'down' in new_list[l]:
                for i in new_list[l]:
                    if i not in {'d', 'o', 'w', 'n', ' ', '\n'}:
                        depth = depth+int(i)  
            
    print(horizontal)
    print(depth)
    print(horizontal*depth)
                

#first_solve()

def second_solve():
    name = '/Users/margaux/Documents/AdventofCode/2021/second_problem.txt'
    with open(name, 'rb') as file:
        data = file.readlines()
        depth, horizontal, aim = 0, 0, 0
        
        list = []
        for line in data:
            list.append(line)
        new_list = []
        for k in range(0, len(list)):
            new_list.append(list[k].decode("utf-8"))
        for l in range(0, len(new_list)):
            if 'forward' in new_list[l]:
                for i in new_list[l]:
                    if i not in {'f', 'o', 'r', 'w', 'a', 'r', 'd', ' ', '\n'}:
                        horizontal = horizontal+int(i)
                        depth = depth+int(i)*aim
            if 'up' in new_list[l]:
                for i in new_list[l]:
                    if i not in {'u', 'p', ' ', '\n'}:
                        aim = aim-int(i)  
            if 'down' in new_list[l]:
                for i in new_list[l]:
                    if i not in {'d', 'o', 'w', 'n', ' ', '\n'}:
                        aim = aim+int(i)  
            
    print(horizontal)
    print(depth)
    print(horizontal*depth)
    
second_solve()