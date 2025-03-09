const rad = Math.PI / 180
var play = false
// пересечение: круг1, индекс1, круг2, индекс2
const connections = [[0, 4, 1, 0]] 
const lists = []
const argumentsCircle = []
var turnCircle = []
const circles = document.querySelectorAll(".circle")
circles.forEach(function(circle1){
	const list1 = Array.prototype.slice.call( circle1.children )
	lists.push(list1)
	var x = circle1.style.getPropertyValue('--x')
	var y = circle1.style.getPropertyValue('--y')
	var r = circle1.style.getPropertyValue('--r')
	argumentsCircle.push([x, y, r])
	turnCircle.push(0)
	var alpha = 360/list1.length * rad
	var i = 0
	list1.forEach(function(element){
		element.style.top = y - Math.sin(alpha * i).toFixed(2) * r + "px"
		element.style.left = x - Math.cos(alpha * i).toFixed(2) * r + "px"
		i+=1
	})
})
connections.forEach(function(conn){
	lists[conn[0]][conn[1]].style.visibility = "hidden"
})
const buttonsBlock = document.querySelector(".buttonsBlock")
const buttons = document.querySelectorAll(".button")

buttons.forEach(function(button1){
	button1.onclick = function () {
		if(!play){
			buttonsBlock.style.background = "black"
			play = true
			id = button1.id
 			
			var mode
			if(button1.classList.contains("dur1")){
				mode = 1
			} else{
				mode = -1
			}
			turnCircle[id]-=mode
			connections.forEach(function(conn){
				if(conn[0] == id){
					var length1 = lists[conn[0]].length
					lists[conn[0]][conn[1]].style.visibility = "visible"
					lists[conn[2]][conn[3]].style.visibility = "hidden"
					if(mode == 1){
						if(conn[1]+1 == length1){
							conn[1] = 0
						} else{
							conn[1]+=1
						}
					} else if(mode == -1){
						if(conn[1] == 0){
							conn[1] = length1-1
						} else{
							conn[1]-=1
						}
					}
					lists[conn[2]][conn[3]].src = lists[conn[0]][conn[1]].src
				}
				else if(conn[2] == id){
					var length2 = lists[conn[2]].length
					lists[conn[2]][conn[3]].style.visibility = "visible"
					lists[conn[0]][conn[1]].style.visibility = "hidden"
					if(mode == 1){
						if(conn[3]+1 == length2){
							conn[3] = 0
						} else{
							conn[3]+=1
						}
					} else if(mode == -1){
						if(conn[3] == 0){
							conn[3] = length2-1
						} else{
							conn[3]-=1
						}
					}
					lists[conn[0]][conn[1]].src = lists[conn[2]][conn[3]].src
				}
				
			})
			
			var alpha = 360/lists[id].length * rad
			var x = argumentsCircle[id][0]
			var y = argumentsCircle[id][1]
			var r = argumentsCircle[id][2]
			
			var sec = 2
		
			let start = Date.now();
			let timer = setInterval(function() {
				let timePassed = Date.now() - start;
				if (timePassed >= sec * 1000) {
					clearInterval(timer)
					play = false
					buttonsBlock.style.background = "white"
					return
				}
				var i = turnCircle[id] + mode
				lists[id].forEach(function(element){
					element.style.top = y - Math.sin(alpha * i - mode * alpha * (timePassed/sec/1000)).toFixed(2) * r + "px"
					element.style.left = x - Math.cos(alpha * i - mode * alpha * (timePassed/sec/1000)).toFixed(2) * r + "px"
					if(i+1 == lists[id].length){
						i = 0
					} else{ i+=1 }
				})
			}, 20)
			
		}
	}
})