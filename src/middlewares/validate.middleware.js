const validate = (req,res,next)=>{
const result = schema.safeParse({body:req.body , query:req.query, params :req.params});
if(!result.success){
    const error = result.error.issues.map(i)=>
        (`${i.path.slice(1).join('.') || 'request'}: ${i.message}`)
    return next(apiError(400, 'Validation failed', errors));
    }
if (result.data.body) req.body = result.data.body;
next();
        

    }
}