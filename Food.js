class Food
{
    constructor()
    {
        var foodStock, lastFed; 
        this.milk = loadImage("MILK.png")
    }

    getFoodStock()
    {
        database.ref("foodStock").on("value", function(data)
        {
            foodStock = data.val()
        })
    }

    updateFoodStock(state)
    {
        database.ref("/").update
        ({
            Food:state   
        })
    }

    display()
    {
       var x = 80, y = 100;

       imageMode(CENTER)
       image(food.milk, 720, 220, 70, 70);

       if(this.foodStock != 0)
       {
           for(var i = 0; i<this.foodStock; i++)
           {
               if(i%10 == 0)
               {
                   x = 80,
                   y = y+70
               }

               image(food.milk, x, y, 70, 70);
               x = x+40
           }
       }

    }
}