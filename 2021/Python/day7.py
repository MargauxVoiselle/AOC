#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue Dec  7 17:13:11 2021

@author: margaux
"""
def part1(file):
    search(file, cost = lambda a,b : abs(a-b))
    
def part2(file):
    search(file, cost = lambda a,b : abs(a-b)*(abs(a-b)+1)//2)
    
def search(file, cost):
    with open(file, 'r') as file:
        data = file.read().split(',')
        positions = []
        for count in range(len(data)):
            positions.append(int(data[count]))
    fuel_list = []
    mini, maxi = min(positions), max(positions)
    
    for k in range(mini, maxi+1):
        total_fuel = 0
        for position in positions:
            total_fuel = total_fuel+cost(position,k)
        fuel_list.append(total_fuel)
    print(min(fuel_list))
    
file = "../data/puzzle7.txt"
part1(file)
part2(file)
    

