export const EXAMPLE_CODE = `say Welcome to the Sample ScriptQuest Adventure Game!
pause

say You are standing at the entrance of a cave.
pause

say You can hear strange noises coming from inside.
pause

say Do you dare to enter?
say TYPE 'yes' TO ENTER THE CAVE
say TYPE 'no' TO NOT ENTER THE CAVE

read choice

if choice is yes
    say You summon your courage and step inside the cave.
    pause    

    say As you venture deeper, you notice a faint light ahead.
    pause

    say You cautiously approach the light and found something.
    pause

    say It's a hidden treasure chest!
    pause

    say Do you open it?
    say TYPE 'yes' TO OPEN THE CHEST
    say TYPE 'no' TO TO LEAVE IT
    
    read choice2
    
    if choice2 is yes
        say You open the treasure chest and find a pile of gold and jewels!
        pause

        say Congratulations! You have become rich and victorious!
        pause

        say Game Over.
        exit
    end
    
    if choice2 is no
        say You resist the temptation to open the treasure chest.
        pause

        say You continue exploring the cave and find a hidden passage.
        pause

        say Do you enter the passage?
        say TYPE 'yes' TO ENTER THE PASSAGE
        say TYPE 'no' TO NOT ENTER THE PASSAGE
        
        read choice3
        
        if choice3 is yes
            say You follow the passage and discover a secret exit, leading you safely outside.
            pause

            say Though you missed the treasure, you have survived your adventure!
            pause

            say Game Over.
            exit
        end
        
        if choice3 is no
            say You decide not continue exploring the cave.
            pause

            say Suddenly, you stumble upon a ferocious dragon!
            pause

            say You try to escape, but the dragon blocks your path.
            pause
  
            say In a last-ditch effort, you fight the dragon with your sword.
            pause

            say The battle is fierce, but alas, you slay it and emerge victorious!
            pause

            say Congrats! You have triumphed and claim the cave as your own!
            pause

            say Game Over.
            exit
        end
    end
end

if choice is no
    say You decide it's best to turn back and leave it.
    pause

    say As you exit, you hear a loud noise behind you.
    pause

    say You turn just in time to see the cave collapse.
    pause

    say You narrowly escape a dangerous cave-in safely.
    pause

    say Congrats! You have survived the adventure!
    pause

    say Game Over.
    exit
end`;
