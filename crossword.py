
board = [[' '] * 22 for _ in range(22)]
names = ['alice', 'bob', 'charlie', 'david', 'emma', 'frank', 'grace', 'henry', 'isabella', 'jack', 'lily', 'michael', 'nora', 'oliver', 'penny']
#names = ['bob', 'oliver', 'isa']
char_word_map = {}

# Iterate through each word in the names list
for word in names:
    # Iterate through each character in the word
    for char in word:
        # Check if the character already exists as a key in the dictionary
        if char in char_word_map:
            # If the key exists, append the word to the list of words for that character
            char_word_map[char].append(word)
        else:
            # If the key doesn't exist, create a new list with the word as the first element
            char_word_map[char] = [word]

used = {}
for name in names:
    used[name] = False


#print(char_word_map)


placed = 0
def place(board, name, x, y, direction):
    board_copy = board
    new_x = x
    new_y = y
    for char in name:
        if new_y == y and new_x == x:
            pass
        elif board_copy[new_y][new_x] == ' ' or new_y == y and new_x == x:
            if(direction == 'vertical'):
                if board_copy[new_x+1] != ' ' or board_copy[new_x-1] != ' ' or board_copy[new_y+1] != ' ':
                    board_copy[new_y][new_x] = char
                else:
                    return False
            if(direction == 'horizontal'):
                if board_copy[new_x+1] != ' ' or board_copy[new_y-1] != ' ' or board_copy[new_y+1] != ' ':
                    board_copy[new_y][new_x] = char
                else:
                    return False
            
                

        else:
            return False
        new_x += 1 if direction == 'horizontal' else 0
        new_y += 1 if direction == 'vertical' else 0
    
    return board_copy


if placed == 0:
    board = place(board, names[0], 5, 10, 'vertical')
    used[names[0]] = True

for x in range(20):
    print(board[x])

index = 0
while index < 20:
    for y in range(20):
        for x in range(20):
            if board[y][x] != ' ':
                char = board[y][x]
                for word in char_word_map[char]:
                    if not used[word]:
                        used[word] = True
                        print(char, word, word.index(char))
                        result = place(board, word, x, y-word.index(char), 'vertical')
                        if result != False:
                            #board = result
                            for x in range(20):
                                print(result[x])
                        else:    
                            result = place(board, word, x-word.index(char), y, 'horizontal')
                            if result != False:
                                #board = result
                                for x in range(20):
                                    print(result[x])
                        break
                    
            
        


    index += 1

        
    

for x in range(20):
    print(board[x])


