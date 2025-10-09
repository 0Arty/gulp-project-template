
##-------------------------------
#with array in props 

example.html
```
    <div>
        @@if(typeof title !=='undefined'){
            <p class="tsb">@@title</p>
        }

        <ul>
            @@if (typeof array !== 'undefined' && Array.isArray(array)) {
               @@for (var i = 0; i < array.length; i++) { 
                <li>`+array[i].text+`</li>
               }
            }
        </ul>
    </div>
```
#usage
```
@@include('*/example.html', {
    title: "",
    array: [
        {text: ""},
        {text: ""},
        {text: ""},
        {text: ""},
    ]
})
```
##-------------------------------