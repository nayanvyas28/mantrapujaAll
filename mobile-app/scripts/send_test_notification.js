/**
 * Script to test sending an Expo Push Notification.
 * Usage: node scripts/send_test_notification.js <YOUR_EXPO_PUSH_TOKEN>
 */

const https = require('https');

async function sendPushNotification(expoPushToken) {
    const message = {
        to: expoPushToken,
        sound: 'default',
        title: 'Daily Astro Update ♈️',
        body: 'A wave of new energy enters your life today. Embrace challenging tasks head-on!',
        data: { route: '/(tabs)/index' },
    };

    const data = JSON.stringify(message);

    const options = {
        hostname: 'exp.host',
        port: 443,
        path: '/--/api/v2/push/send',
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data),
        },
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let responseBody = '';

            res.on('data', (chunk) => {
                responseBody += chunk;
            });

            res.on('end', () => {
                if (res.statusCode === 200) {
                    resolve(JSON.parse(responseBody));
                } else {
                    reject(new Error(`Failed with status code: ${res.statusCode} - ${responseBody}`));
                }
            });
        });

        req.on('error', (e) => {
            reject(e);
        });

        req.write(data);
        req.end();
    });
}

async function main() {
    const token = process.argv[2];

    if (!token || !token.startsWith('ExponentPushToken[')) {
        console.error('❌ Error: Please provide a valid Expo Push Token as an argument.');
        console.log('Usage: node scripts/send_test_notification.js "ExponentPushToken[xxxxxxxxxxxxxxxxxxxxx]"');
        console.log('\nNOTE: In Expo SDK 53+, remote push notifications do NOT work in the Expo Go app. You must build a native development client (e.g., npx expo run:android or run:ios).');
        process.exit(1);
    }

    console.log(`Sending test notification to: ${token}...`);
    try {
        const result = await sendPushNotification(token);
        console.log('✅ Notification sent successfully!');
        console.log('Response:', result);
    } catch (error) {
        console.error('❌ Error sending notification:', error.message);
    }
}

main();
