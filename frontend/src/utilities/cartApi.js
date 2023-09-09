export async function createOrUpdateCart(cartRequest){
    const createOrUpdateResponse = await fetch('http://localhost:4000/cart', {
        method:'POST',
        body:JSON.stringify(cartRequest), 
        headers:{
            'Content-Type':"application/json"
        }
    });
    if(createOrUpdateResponse.ok){
        return createOrUpdateResponse.json(); 
    }
}


export async function destroy(userId){
    try{
        const deleteResponse = await fetch(`http://localhost:4000/cart/:${userId}`,{method:'DELETE'})
        if(deleteResponse?.ok){
            console.log('converting to json');
            return true;
        }
        else{
            throw new Error('invalid request')
        }
    }
    catch(error){
        throw new Error(error);
    }
}