const levels = [{
  levNumCur: 1,
  levName: 'Find Berries',
  levAnswer: 'berries',
  levStrobe: 'berries',
  levBoardMarkup: `
  <frog> </frog>
  <acorn> </acorn>  
  <berries> </berries> 
  <mushrooms> </mushrooms>
    `
},
{
  levNumCur: 2,
  levName: 'All The Frogs',
  levAnswer: 'frog',
  levStrobe: 'frog',
  levBoardMarkup: `
  <frog> </frog>
  <frog> </frog>
  <frog> </frog>
    `
},
{
  levNumCur: 3,
  levName: 'Find Leaf On Snail',
  levAnswer: 'snail leaf',
  levStrobe: 'snail leaf',
  levBoardMarkup: `
       <frog> </frog>
       <snail> </snail>  
       <leaf> </leaf>
       <snail> <leaf> </leaf></snail>  
         `
},
{
  levNumCur: 4,
  levName: 'Find Leaf Of Oak',
  levAnswer: 'oakleaf',
  levStrobe: 'oakleaf',
  levBoardMarkup: `
  <frog> </frog>
  <hedgehog> </hedgehog>
  <leaf> </leaf>
  <snail> <oakleaf> </oakleaf></snail>
    `
},
{
  levNumCur: 5,
  levName: 'Find All Owls',
  levAnswer: 'owl',
  levStrobe: 'owl',
  levBoardMarkup: `
  <owl> </owl>
  <owl> </owl>
  <oakleaf> </oakleaf>
  <owl> </owl>
  `
},
{
  levNumCur: 6,
  levName: 'Find Inedible Mushrooms',
  levAnswer: '.not-good',
  levStrobe: 'mushrooms.not-good',
  levBoardMarkup: `
  <oakleaf></oakleaf> 
  <mushrooms></mushrooms>
  <mushrooms class="not-good"> </mushrooms> 
  <frog><berries></berries></frog>
    `
},
{
  levNumCur: 7,
  levName: 'Where Are Berries?',
  levAnswer: 'berries',
  levStrobe: 'berries',
  levBoardMarkup: `
  <hedgehog><mushrooms></mushrooms></hedgehog>
  <hedgehog> <mushrooms> </mushrooms> </hedgehog>
  <hedgehog><berries> </berries> </hedgehog>
    `
},
{
  levNumCur: 8,
  levName: 'Find Green Berries Class',
  levAnswer: '.green',
  levStrobe: 'berries',
  levBoardMarkup: `
  <owl> </owl>
  <acorn> <berries class="green"> </berries> </acorn> 
  <hedgehog><mushrooms> </mushrooms></hedgehog> 
       `
},
{
  levNumCur: 9,
  levName: 'Find All Leaves',
  levAnswer: 'leaf',
  levStrobe: 'leaf',
  levBoardMarkup: `
  <leaf> </leaf>
  <acorn> </acorn>
  <leaf> </leaf>
  <leaf><snail></snail></leaf> 
   `
},
{
  levNumCur: 10,
  levName: 'Find Snail And Hedgehog',
  levAnswer: '.on-leaf',
  levStrobe: '.on-leaf',
  levBoardMarkup: `
  <acorn> </acorn>
  <leaf><hedgehog class="on-leaf"></hedgehog></leaf>
  <leaf><snail class="on-leaf"></snail></leaf> 
  <leaf> </leaf>
    `
}];

export default levels;
