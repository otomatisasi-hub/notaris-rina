-- RBAC & Audit Schema for SIMANIS

-- 1. Roles Table
CREATE TABLE IF NOT EXISTS roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text UNIQUE NOT NULL,
    description text
);

-- 2. Permissions Table
CREATE TABLE IF NOT EXISTS permissions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text UNIQUE NOT NULL,
    description text
);

-- 3. Role-Permission Mapping
CREATE TABLE IF NOT EXISTS role_permissions (
    role_id uuid REFERENCES roles(id) ON DELETE CASCADE,
    permission_id uuid REFERENCES permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

-- 4. Extended User Profile Table
CREATE TABLE IF NOT EXISTS user_profiles (
    user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name text,
    role_id uuid REFERENCES roles(id),
    is_active boolean DEFAULT true,
    last_login timestamptz,
    failed_attempts int DEFAULT 0
);

-- 5. Audit Log Table
CREATE TABLE IF NOT EXISTS audit_logs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id),
    action text NOT NULL,
    target text,
    details jsonb,
    role_context text,
    created_at timestamptz DEFAULT now()
);

-- 6. Seed Roles
INSERT INTO roles (id, name, description) VALUES
    (gen_random_uuid(), 'super_admin', 'Full system access'),
    (gen_random_uuid(), 'notaris', 'Notarial services access'),
    (gen_random_uuid(), 'ppat', 'PPAT services access'),
    (gen_random_uuid(), 'keuangan', 'Finance access')
ON CONFLICT (name) DO NOTHING;

-- 7. Seed Example Permissions
INSERT INTO permissions (id, name, description) VALUES
    (gen_random_uuid(), 'dashboard_full', 'Full dashboard access'),
    (gen_random_uuid(), 'dashboard_notaris', 'Notaris dashboard access'),
    (gen_random_uuid(), 'dashboard_ppat', 'PPAT dashboard access'),
    (gen_random_uuid(), 'dashboard_keuangan', 'Finance dashboard access'),
    (gen_random_uuid(), 'user_manage', 'User management'),
    (gen_random_uuid(), 'service_notaris_crud', 'CRUD Notaris services'),
    (gen_random_uuid(), 'service_ppat_crud', 'CRUD PPAT services'),
    (gen_random_uuid(), 'service_syariah_crud', 'CRUD Syariah services'),
    (gen_random_uuid(), 'finance_full', 'Full finance access'),
    (gen_random_uuid(), 'finance_read', 'Read-only finance access'),
    (gen_random_uuid(), 'audit_log_view', 'View audit log'),
    (gen_random_uuid(), 'audit_trail_view', 'View audit trail')
ON CONFLICT (name) DO NOTHING;

-- 8. Example Role-Permission Mapping (add more as needed)
-- Super Admin: all permissions
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p WHERE r.name = 'super_admin'
ON CONFLICT DO NOTHING;
-- Notaris: notaris dashboard, notaris CRUD, audit trail
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p WHERE r.name = 'notaris' AND p.name IN ('dashboard_notaris', 'service_notaris_crud', 'audit_trail_view')
ON CONFLICT DO NOTHING;
-- PPAT: ppat dashboard, ppat CRUD, audit trail
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p WHERE r.name = 'ppat' AND p.name IN ('dashboard_ppat', 'service_ppat_crud', 'audit_trail_view')
ON CONFLICT DO NOTHING;
-- Keuangan: finance dashboard, finance full, audit log view, read-only on services
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p WHERE r.name = 'keuangan' AND p.name IN ('dashboard_keuangan', 'finance_full', 'audit_log_view', 'finance_read')
ON CONFLICT DO NOTHING;

-- 9. RLS Policies
-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Only allow users to see/edit their own profile (or super_admins)
CREATE POLICY "Users can view/edit their own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Only allow super_admins to see all profiles (example, you may want to use a function to check role)
-- (You can implement a function is_super_admin(auth.uid()) returning boolean)

-- Only allow users to see their own audit logs
CREATE POLICY "Users can view their own audit logs" ON audit_logs
    FOR SELECT USING (auth.uid() = user_id);

-- Only allow super_admins to insert audit logs for any user (optional, or allow all inserts)
CREATE POLICY "Anyone can insert audit logs" ON audit_logs
    FOR INSERT USING (true);

-- 10. Grant permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO anon, authenticated;















