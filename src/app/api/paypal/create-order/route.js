import { NextResponse } from 'next/server';
import paypal from '@paypal/checkout-server-sdk';
import client from '@/utils/paypal';

export async function POST(request) {
  console.log('Create order');
  console.log('PayPal Client ID:', process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID);
  console.log('PayPal Client Secret:', process.env.PAYPAL_CLIENT_SECRET);

  try {
    const { total } = await request.json();
    console.log('Total:', total);

    const paypalRequest = new paypal.orders.OrdersCreateRequest();
    paypalRequest.prefer('return=representation');
    paypalRequest.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'USD',
          value: total,
        },
      }],
    });

    const order = await client.execute(paypalRequest);
    console.log('Order created:', order);
    return NextResponse.json({ id: order.result.id });
  } catch (error) {
    console.error('Error creating PayPal order:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
