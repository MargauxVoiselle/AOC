#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Wed Dec  1 07:56:19 2021

@author: margaux
"""
name = "/Users/margaux/Documents/AdventofCode/2021/first_problem.txt"
def first_solve(name):
    with open(name, 'rb') as file:
        data = file.readlines()
        compteur = 0
        list = []
        for line in data:
            list.append(line)
        for k in range(0, len(list)-1):
            if list[k].decode()<=list[k+1].decode():
                compteur = compteur + 1
    print(compteur)
    
first_solve(name)
        

def second_solve(name):
    with open(name, 'rb') as file:
        data = file.readlines()
        compteur = 0
        list = []
        for line in data:
            list.append(line)
        for k in range(0, len(list)-3):
            if int(list[k].decode())+int(list[k+1])+int(list[k+2])<int(list[k+1].decode())+int(list[k+2])+int(list[k+3]):
                compteur = compteur+1
    print(compteur)
    
second_solve(name)