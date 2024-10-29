import {fakeListing} from "./fake-data.js";
import { db } from "../database.js";

const getAllListingRoute={
    method:'GET',
    path:'/api/listing',
    handler:async(req,h)=>{
        const {results}=await db.query('SELECT * FROM listing')
        return results;
    }
}

const getListingRoute={
    method:'GET',
    path:'/api/listing/{id}',
    handler:(req,h)=>{
        const id=req.params.id;
        const listing= fakeListing.find(listing=>listing.id===id);
        if(!listing) return {"error":`Listing does not exist with id ${id}`};
        return listing;
    }
}

export default [
    getAllListingRoute,
    getListingRoute
]