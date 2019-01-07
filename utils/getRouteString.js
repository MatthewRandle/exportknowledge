export default function getRouteString(route, req) {
    const protocol = req ? req.headers['x-forwarded-proto'] || "http" : 'http';
    const baseUrl = req ? `${protocol}://${req.headers.host}` : '';

    return baseUrl + route;
}