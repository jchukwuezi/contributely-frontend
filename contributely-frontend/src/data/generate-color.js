export const generateRandomColor = (data) =>{
   //generates random colours and puts them in string
    var colors = [];
    for (var i = 0; i < data.length; i++) {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var x = 0; x < data.length; x++) {
        color += letters[Math.floor(Math.random() * 16)];
        }
        colors.push(color);
    }
    return colors;
}

export const getRandomColorPie = (data) =>{
    let colors = []
    for(let i=0;i<data.length;i++){
        colors.push('#'+Math.floor(Math.random()*16777215).toString(16));
    }
  return colors;
}


export default generateRandomColor;