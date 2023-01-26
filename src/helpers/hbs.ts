export let CustomHelper = {
    json: (context) => {
        function toList(obj, indent) {
            var res=""
            for (var k in obj) { 
                if (obj[k] instanceof Object) {
                    res=res+k+"\n"+toList(obj[k], ("   " + indent)) ;
                }
                else{
                    res=res+indent+k+" : "+obj[k]+"\n";
                }
            }
            return res;
          }    
        return toList(context,"");
    },
    ifCond: (v1, v2, options) => {
        if (v1 === v2) {
            return options.fn(this)
        }
        return options.inverse(this)
    },
    first: (list, index, options) => {
        if (list.length) {
            if (list[0][index]) return list[0][index]
        }
        return options.inverse(this)
    },
    contains: (list, string, options) => {
        if (list === string) {
            return options.fn(this)
        }
        return options.inverse(this)
    },
    check: (v1, options) => {
        if (v1 === true) {
            return options.fn(this)
        }
        return options.inverse(this)
    }
}