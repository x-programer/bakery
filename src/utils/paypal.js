import paypal from '@paypal/checkout-server-sdk';

const environment = process.env.NODE_ENV === 'production'
  ? new paypal.core.LiveEnvironment(process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET)
  : new paypal.core.SandboxEnvironment(process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET);

const client = new paypal.core.PayPalHttpClient(environment);

export default client;
