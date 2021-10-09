function ApiClass(api){
    this.api=api
    this.getData=async function (api){
         
           try {
              data = await (await fetch(`${this.api}`)).json();
               // console.log(data)
              } catch (e) {
                console.log("ERROR", e.message);
              }
            return data
        
    }
}

const api1= new ApiClass('https://breakingbadapi.com/api/quotes')
const api2= new ApiClass('https://breakingbadapi.com/api/characters')
const api3= new ApiClass('https://jsonplaceholder.typicode.com/posts')
console.log(api1.getData())