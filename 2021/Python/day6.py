#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Dec  6 22:55:41 2021

@author: margaux
"""

from collections import Counter, defaultdict


def solveDay(myFile):
    data = parseData(myFile)
    print('Part 1: ', part1(data))
    print('Part 2: ', part2(data))


def parseData(myFile):
    return dict(Counter(map(int, open(myFile).read().split(','))))


def part1(data):
    return sum(breeding(data, 80).values())


def part2(data):
    return sum(breeding(data, 256).values())


def breeding(swarm, days):
    while days:
        new = defaultdict(int)
        for k in swarm:
            if k > 0:
                new[k - 1] += swarm[k]
            else:
                new[6] += swarm[k]
                new[8] += swarm[k]
        swarm = new
        days -= 1
    return swarm


def first_solve(n):
    name = "../data/puzzle6.txt"
    with open(name, 'rb') as file:
        data = file.read()
        list = []
        for k in range(len(data)):
            if data[k] != 44: #on évite de tomber sur une virgule
                list.append(data[k]-48)
        compteur = 1
        while compteur != n+1:
            for k in range(0, len(list)):
                if list[k] == 0:
                    list.append(8)
                    list[k] = 6
                else:
                    list[k] = list[k]-1
            compteur = compteur+1
            print(compteur)
        print(len(list))
        
            
            
            
            
first_solve(256)