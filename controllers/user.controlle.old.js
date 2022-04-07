
module.export.validacionesPostUsers =  (req, res) => {
try {
        //validacion del envio
    if(
        !req.body?.nombre||
        !req.body?.email||
        !req.body?.password||
        !req.body?.anos_experiencia||
        !req.body?.especialidad||
        !req.body?.estado
       
    ){
        throw new Error('erro en los campos')
    }
  
    //validacion de texto blanco
    const{
        email,
        nombre,
        password,
        anos_experiencia,
        especialidad,
        estado,
    } = req.body

    if(
        !email.trim()||
        !nombre.trim()||
        !password.trim()||
        !anos_experiencia.trim()||
        !especialidad.trim()||
        !estado.trim()
            
    ){      
        throw new Error('no se puede mandar nada en blanco')
    }

    //validaciones de foto    
    const{foto}=req.files
       
    const mimetypes=["image/jpeg","image/jpg","image/png"]

    if(!mimetypes.includes(foto.mimetype)){
        throw new Error('solo se puede archivo de jpg o jpeg')
    }
    
    if(foto.size > 5*1024*1024){
        throw new Error('maximo 5MB')
    }
    
   
}catch (error) {
        console.log(error)
        return res.status(400).json({
            ok:false, 
            msg: error.message
        })
    }

}


