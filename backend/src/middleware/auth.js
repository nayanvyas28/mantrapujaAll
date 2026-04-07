const { supabase } = require('../utils/supabase');

/**
 * Authentication Middleware 
 * 1. Checks for a valid Supabase JWT in the Authorization header.
 * 2. Checks for a valid ADMIN_SECRET if provided in the body or header.
 */
const authenticateAdmin = async (req, res, next) => {
    try {
        const { secret } = req.body;
        const authHeader = req.headers.authorization;
        const ADMIN_SECRET = process.env.ADMIN_SECRET || 'mantrapuja-admin-keys';

        // 1. Check for the simple secret (for automated/legacy tools)
        if (secret === ADMIN_SECRET || req.headers['x-admin-secret'] === ADMIN_SECRET) {
            return next();
        }

        // 2. Check for Supabase JWT
        if (!authHeader) {
            return res.status(401).json({ error: "Unauthorized access. No token or secret provided." });
        }

        const token = authHeader.split(' ')[1];
        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user) {
            return res.status(401).json({ error: "Invalid or expired token." });
        }

        // 3. Optional: Check if the user is actually an admin in the `profiles` table
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('is_admin')
            .eq('id', user.id)
            .single();

        if (profileError || !profile?.is_admin) {
             return res.status(403).json({ error: "Forbidden. Admin privileges required." });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error("Auth Middleware Error:", err);
        return res.status(500).json({ error: "Internal server error during authentication." });
    }
};

module.exports = {
    authenticateAdmin
};
