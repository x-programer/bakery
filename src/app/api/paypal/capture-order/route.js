import { NextResponse } from 'next/server';
import paypalUtils from '@/utils/paypal';
import paypalSDK from '@paypal/checkout-server-sdk';

export async function POST(request) {
  try {
    const { orderID } = await request.json();

    const captureRequest = new paypalSDK.orders.OrdersCaptureRequest(orderID);
    captureRequest.requestBody({});

    const capture = await paypalSDK.client().execute(captureRequest);

    if (capture.result.status === 'COMPLETED') {
      return NextResponse.json({ 
        message: 'Payment captured successfully', 
        details: capture.result 
      });
    } else {
      throw new Error('Payment not completed');
    }
  } catch (error) {
    console.error('Error capturing PayPal order:', error);
    return NextResponse.json(
      { error: 'Failed to capture payment' }, 
      { status: 500 }
    );
  }
}
