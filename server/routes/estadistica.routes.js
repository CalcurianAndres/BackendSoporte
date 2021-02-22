const express = require('express');
const Ticket = require('../database/models/ticket.model');


const app = express();

app.get('/api/estadistica', (req, res)=>{
    Ticket.countDocuments({}, (err,Total)=>{

        if( err ){
            return res.status(400).json({
                ok:false,
                err
            });
        }
        Ticket.countDocuments({estado:'ABIERTO'}, (err,Abiertos)=>{
    
            if( err ){
                return res.status(400).json({
                    ok:false,
                    err
                });
            }
            Ticket.countDocuments({estado:'EJECUTANDOSE'}, (err,Ejecutandose)=>{
        
                if( err ){
                    return res.status(400).json({
                        ok:false,
                        err
                    });
                }
                Ticket.countDocuments({estado:'CERRADO'}, (err,Cerrados)=>{
            
                    if( err ){
                        return res.status(400).json({
                            ok:false,
                            err
                        });
                    }
                    res.json({
                        ok:true,
                        Total,
                        Abiertos,
                        Ejecutandose,
                        Cerrados
                    });
                });
            });
        });
    });

});


module.exports = app;