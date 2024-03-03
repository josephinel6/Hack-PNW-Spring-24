import copy
import random
size = 30
board = [[' '] * size for _ in range(size)]
names = ['alice', 'bob', 'charlie', 'david', 'emma', 'frank', 'grace', 'henry', 'isabella', 'jack', 'lily', 'michael', 'nora', 'oliver', 'penny']
random.shuffle(names)
char_word_map = {}

for word in names:
    for char in word:
        if char in char_word_map:
            char_word_map[char].append(word)
        else:
            char_word_map[char] = [word]

used = {}
for name in names:
    used[name] = False

placed = 0
def place(board, name, x, y, direction):
    index = 0
    board_copy = copy.deepcopy(board)
    new_x = x
    new_y = y
    for char in name:
        if index == 0:
            if direction == 'vertical' and (board_copy[new_y-1][new_x] != ' ' or board_copy[new_y][new_x-1] != ' ' or board_copy[new_y][new_x+1] != ' '):
                return False
            if direction == 'horizontal' and (board_copy[new_y][new_x-1] != ' ' or board_copy[new_y-1][new_x] != ' ' or board_copy[new_y+1][new_x] != ' '):
                return False
            board_copy[new_y][new_x] = char
        elif board_copy[new_y][new_x] == char:
            pass
        elif board_copy[new_y][new_x] == ' ':
            if direction == 'vertical':
                if board_copy[new_y][new_x + 1] == ' ' and board_copy[new_y][new_x - 1] == ' ' and board_copy[new_y + 1][new_x] == ' ':
                    board_copy[new_y][new_x] = char
                else:
                    return False
            if direction == 'horizontal':
                if board_copy[new_y][new_x + 1] == ' ' and board_copy[new_y - 1][new_x] == ' ' and board_copy[new_y + 1][new_x] == ' ':
                    board_copy[new_y][new_x] = char
                else:
                    return False
        else:
            return False
        new_x += 1 if direction == 'horizontal' else 0
        new_y += 1 if direction == 'vertical' else 0
        index += 1
    
    return board_copy



board = place(board, names[0], 10, 10, 'vertical')
used[names[0]] = True


index = 0



while index < 50:
    not_placed = True
    index += 1
    for y in range(size):
        for x in range(size):
            if board[y][x] != ' ' and not_placed:
                char = board[y][x]
                for word in char_word_map[char]:
                    if not used[word]:
                        result = place(board, word, x, y-word.index(char), 'vertical')
                        if result != False:
                            used[word] = True
                            board = result
                            not_placed = False
                        else:    
                            result = place(board, word, x-word.index(char), y, 'horizontal')
                            if result != False:
                                used[word] = True
                                board = result
                                not_placed = False
                        
            
        
                    
            
for x in range(size):
    print(board[x])


    


