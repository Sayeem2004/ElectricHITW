# Electric Hole in the Wall
---
## Mohammad Khan and Shrey Patel

This game is a two-dimensional version of the popular Japanese game show "Hole in the Wall." We utilize Coulomb's law by allowing the user to place clumps of protons and electrons to attract or repel a charged object to move it to a certain place.

The user is able to adjust the following:
- Gameplay mode 
    - Zen or Timed mode (total time of Timed mode can be adjusted) 
- Difficulty mode (Easy, Normal, Hard, Freestyle) which entail the following settings
    - Hole size (compared to object size)
    - Magnitude of charge per cluster 
    - Object complexity (Simple, Normal, and Complex shapes)
    - Randomness of the charge distribution on the object can be adjusted (uniform to perfectly random)
    - Presence of barriers

Easy, Normal, and Hard mode will have preset unchangeable settings, but in freestyle mode the user can change settings in the pause menu. Note that these settings will only take effect after the current level is completed. 

Rotation was a potential feature that we did not end up coding, so that will not be present in the game. Also we stated that we would have barriers that restarted the level when touched, we ended up not doing that and instead the barriers just bounce the charged object away. This change was motivated by the fact that it was harder to control the charged object than expected and restarting the level would be too difficult in our opinions. We also said that we would use friction, we decided against that as well because it didn't add much to the game and only made things move slower.  

Once settings are chosen, instructions and commands will be shown to the user. A object and charged distribution will be generated, as well as the hole. The user can then place down and remove charged clumps with left click, change between proton and electron clumps with the shift key, and clear the screen of all placed charges with "c". After completing the objective, a new object and charge distribution, as well as the hole will be generated.

If the user is playing in Zen Mode, they may exit by pressing spacebar and pressing the "End Game" button. If the user is playing on timed mode, and time runs out, the game will automatically end as well.

If at any point, you encounter a bug in which the game will not let you progress past a level, please reload the page. We attempted designed the game in a way that every level is beatable and done a decent amount of testing, however there may be a chance that a level will not be beatable.

This project was coded in CSS, HTML, and JavaScript. 
