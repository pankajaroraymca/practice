-- Design an authorization schema for sellers and buyers. A seller can different sort of permissions. Seller A can list, delete items. Seller B can list, modify items only
-- A Buyer will have fixed level of permissions

-- This is also an example how permission authorization works

Table User {
    id uuid PRIMARY KEY
    first_name varchar NOT NULL
    last_name varchar NOT NULL
    email TEXT NOT NULL
    is_ative BOOLEAN
    type ENUM('BUYER', 'SELLER', 'ADMIN')
    created_at TIMESTAMP
    updated_at TIMESTAMP
}

TABLE ROLE {
    id uuid PRIMARY KEY
    name enum('BASIC_SELLER', 'ADVANCED_SELLER', 'ADMIN')
    description text
    created_at TIMESTAMP
    updated_at TIMESTAMP
}

TABLE PERMISSIONS {
    id uuid PRIMARY KEY
    code TEXT -- CAN_DELETE_ITEM, CAN_LIST_ITEM, CAN_MODIFY_ITEM
    description text
    created_at TIMESTAMP
    updated_at TIMESTAMP
}

TABLE ROLE_PERMISSIONS {
    id uuid PRIMARY KEY
    role_id uuid
    permission_id uuid
    created_at TIMESTAMP
    updated_at TIMESTAMP
    FOREIGN key (role_id) REFERENCES ROLE(id)
    Foreign Key (permission_id) REFERENCES PERMISSIONS(id)
    created_at TIMESTAMP
    updated_at TIMESTAMP
}

TABLE USER_ROLE {
    id uuid PRIMARY KEY
    user_id uuid
    role_id uuid
    created_at TIMESTAMP
    updated_at TIMESTAMP
    FOREIGN KEY (user_id) REFERENCES user(id)
    FOREIGN KEY (role_id) REFERENCES ROLE(id)
    created_at TIMESTAMP
    updated_at TIMESTAMP
}

TABLE USER_PERMISSION_OVERIDE {
    id uuid PRIMARY KEY
    user_id uuid
    permission_id uuid
    graned boolean -- true for extra permission, false for specific permission revoked.
    created_at TIMESTAMP
    updated_at TIMESTAMP
    FOREIGN KEY (user_id) REFERENCES user(id)
    Foreign Key (permission_id) REFERENCES PERMISSIONS(id)
}

-- Explanation :
-- We have one table for buyer, seller, admins. A type field to distinnguist between them.
-- We have made roles, and each role will have different sort of permissions.
-- Then we have a user role table, each user will be assigned a role. Seller A is basic, Seller B is advanced.
-- As Seller B has extra permissions.
-- A user can have multiple roles, so one to many relationship between user and user_role table. So indirectly user an have multiple permissions
-- If another Seller wants the same sort of permissions, we will assign the same role ids to this seller also.
-- A permission over ride table, in case we want some explicit permissions to only specific seller. or if we want to revoke specific permission.

-- Hw authorization will work?
-- In Nestjs, we will implement a decorator based approach, each endpoint will have it's permission assigned in decorator.
-- We will have a permission guard. that will check what user has permisisons and check wther particular route can access this endpoint
-- At login time we will store permisisons in jwt.