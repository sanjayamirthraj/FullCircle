export async function POST(request) {
    try {
        const { message } = await request.json();

        if (!message) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }

        const containsLocation = await checkForLocation(message);
        return NextResponse.json({ containsLocation });
    } catch (error) {
        console.error('Error checking for location:', error);
        return NextResponse.json({ error: 'Something went wrong while checking for location.' }, { status: 500 });
    }
}