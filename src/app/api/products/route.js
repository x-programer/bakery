// src>app>api>products>route.js

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request) {
    try {
        await dbConnect();

        const data = await request.formData();
        const file = data.get('image');

        if (!file) {
            return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // With the file data in the buffer, you can do whatever you want with it.
        // For this example, we'll just save it to the public directory
        const imageName = Date.now() + '_' + file.name;
        const path = join(process.cwd(), 'public', 'uploads', imageName);
        await writeFile(path, buffer);

        const product = await Product.create({
            name: data.get('name'),
            description: data.get('description'),
            price: data.get('price'),
            category: data.get('category'),
            imageUrl: `/uploads/${imageName}`,
        });

        return NextResponse.json({ success: true, data: product }, { status: 201 });
    } catch (error) {
        console.error('Error in POST /api/products:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
// get route..
export async function GET(request) {
    try {
        await dbConnect();
        const url = new URL(request.url);
        const category = url.searchParams.get('category');

        const products = await Product.find(category ? { category } : {});

        if (products.length === 0) {
            return NextResponse.json({
                success: false,
                message: "No Products found"
            }, { status: 404 });
        }

        return NextResponse.json(
            {
                success: true,
                data: products
            }, { status: 200 }
        );

    } catch (error) {
        console.error("Error in getting Products information: " + error);
        return NextResponse.json({
            success: false, error: error.message
        }, { status: 500 });
    }
}


// delete rouet..
export async function DELETE(request, {params}) {
    console.log("request come " );
    await dbConnect();
    const {id} = params;
    console.log(id,"new id aai hi hai ");

    try {
        // const url = new URL(request.url);
        // const productId = url.pathname.split('/').pop(); // Extracts the last part of the URL
        // const { productID } = req.query;
        // console.log("This is product id pr"+productId);
        // console.log("This is product id co"+productID);

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Invalid product ID'
                }, { status: 400 }
            );
        }

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Product not found'
                }, { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: deletedProduct
        }, { status: 200 });

    } catch (error) {
        console.error("Error in deleting Product: " + error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}