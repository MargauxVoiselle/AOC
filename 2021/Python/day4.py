#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Dec  4 09:46:51 2021

@author: margaux
"""

name = "../data/puzzle4.txt"
def first_solve():
    with open(name, 'rb') as file:
        data = file.readlines()
        first_line = data[0]
        nombre_lignes = 0
        
        
        # Détermination du nombre de tableau de jeu
        for line in data:
            nombre_lignes = nombre_lignes+1
        nombre_tableaux = (nombre_lignes-1)//6
        
        # Création de la liste globale qui contiendra chaque tableau
        list = [[] for k in range(nombre_tableaux)]
        
        # Remplissage de la liste globale avec les lignes
        compteur, mark = 2, 0
        while mark != nombre_tableaux:
            list[mark].append([data[compteur]])
            list[mark].append([data[compteur+1]])
            list[mark].append([data[compteur+2]])
            list[mark].append([data[compteur+3]])
            list[mark].append([data[compteur+4]])
            compteur = compteur+6
            mark = mark+1
        
        # Tableau final
        compteur = 0 #aller de 2 en 2 pour éviter ','
        sortie = 0
    
        while sortie != 1:
            
            tirage = first_line[compteur].to_bytes(1, 'big')
            new_list = [[] for k in range(nombre_tableaux)]
            mark = 0
            for tableau in list:
                for line in tableau:
                    for element in line:
                        new_element = b''
                        for character in element:
                            if character.to_bytes(1, 'big') != tirage:
                                new_element = new_element+character.to_bytes(1, 'big')
                        new_list[mark].append([new_element])
                mark = mark+1
            
            for tableau in list:
                for line in tableau:
                    for element in line:
                        if len(element) == 6: #plus de chiffres
                            sortie = 1
                            
            compteur = compteur+1
            list = new_list
            
        print(first_line[compteur].to_bytes(1, 'big'))
        print(list)
        
            
        
            
            
            
first_solve()