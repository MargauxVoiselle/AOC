#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Dec  2 15:22:11 2021

@author: margaux
"""
name = '/Users/margaux/Documents/AdventofCode/2021/third_problem.txt'
def first_solve():
    with open(name, 'rb') as file:
        data = file.readlines()
        list = []
        for line in data:
            list.append(line.decode())
        length = len(list[0])-2 # enlève le retour à la ligne
        
        gamma, epsilon = '', ''
        zero_number, one_number = 0, 0
        for k in range(0, length+1):
            for bites in list:
                if bites[k] == '0':
                    zero_number = zero_number + 1
                elif bites[k] == '1':
                    one_number = one_number + 1
            if zero_number >= one_number:
                gamma = gamma + '0'
                epsilon = epsilon + '1'
            else:
                gamma = gamma + '1'
                epsilon = epsilon + '0'
            zero_number, one_number = 0, 0
        print(gamma)
        print(epsilon)
        # Transformation en décimal
        print(int(gamma,2))
        print(int(epsilon,2))
        print(int(gamma,2)*int(epsilon,2))
        
first_solve()

def second_solve():
    with open(name, 'rb') as file:
        data = file.readlines()
        list = []
        for line in data:
            list.append(line.decode())
        
        gamma, epsilon = '', ''
        zero_number, one_number = 0, 0
        k = 0
        while len(list) != 1:
            new_list = []
            for bites in list:
                if bites[k] == '0':
                    zero_number = zero_number + 1
                elif bites[k] == '1':
                    one_number = one_number + 1
            if zero_number > one_number:
                gamma = gamma + '0'
                epsilon = epsilon + '1'
            elif zero_number == one_number:
                gamma = gamma + '1'
                epsilon = epsilon + '0'
            else:
                gamma = gamma + '1'
                epsilon = epsilon + '0'
            
            for bites in list:
                if bites[:k+1] == gamma:
                    new_list.append(bites)
            list = new_list
           
            k = k+1
            zero_number, one_number = 0, 0
        print(int(list[0],2))
            
        list = []
        for line in data:
            list.append(line.decode())
        
        gamma, epsilon = '', ''
        zero_number, one_number = 0, 0
        k = 0
        while len(list) != 1:
            new_list = []
            for bites in list:
                if bites[k] == '0':
                    zero_number = zero_number + 1
                elif bites[k] == '1':
                    one_number = one_number + 1
            if zero_number > one_number:
                gamma = gamma + '0'
                epsilon = epsilon + '1'
            elif zero_number == one_number:
                gamma = gamma + '1'
                epsilon = epsilon + '0'
            else:
                gamma = gamma + '1'
                epsilon = epsilon + '0'
            
            for bites in list:
                if bites[:k+1] == epsilon:
                    new_list.append(bites)
            list = new_list
            
            k = k+1
            zero_number, one_number = 0, 0
        print(int(list[0],2))
        
second_solve()