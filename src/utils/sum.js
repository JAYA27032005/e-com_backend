const calculateTotalAmount = (arr)=>{
    return arr.reduce((acc, curr) => acc + curr.amount, 0);    
 
}