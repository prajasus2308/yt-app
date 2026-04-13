import turtle
t = turtle.Turtle()
t.speed(100)
turtle.bgcolor("black")
t.color("red")

for i in range(60):
    for j in range(10):
        t.forward(80)
        t.right(36)
    t.right(6)

turtle.done()
