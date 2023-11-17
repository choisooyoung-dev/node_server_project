class EmailExistError extends Error {
    constructor(msg) {
        super(msg);
        this.name = "EmailExistError";
    }
}

class UsernameExistError extends Error {
    constructor(msg) {
        super(msg);
        this.name = "UsernameExistError";
    }
}

class ConfirmPasswordMismatchError extends Error {
    constructor(msg) {
        super(msg);
        this.name = "ConfirmPasswordMismatchError";
    }
}

class PasswordLengthError extends Error {
    constructor(msg) {
        super(msg);
        this.name = "PasswordLengthError";
    }
}

class EmailNotExistError extends Error {
    constructor(msg) {
        super(msg);
        this.name = "EmailNotExistError";
    }
}

class PasswordMismatchError extends Error {
    constructor(msg) {
        super(msg);
        this.name = "PasswordMismatchError";
    }
}

class TokenNotExistError extends Error {
    constructor(msg) {
        super(msg);
        this.name = "TokenNotExistError";
    }
}

class TokenTypeMismatchError extends Error {
    constructor(msg) {
        super(msg);
        this.name = "TokenTypeMismatchError";
    }
}

class TokenUserNotExistError extends Error {
    constructor(msg) {
        super(msg);
        this.name = "TokenUserNotExistError";
    }
}

class UnauthUserError extends Error {
    constructor(msg) {
        super(msg);
        this.name = "UnauthUserError";
    }
}

class QuerySyntaxError extends Error {
    constructor(msg) {
        super(msg);
        this.name = "QuerySyntaxError";
    }
}

class WrongPathError extends Error {
    constructor(msg) {
        super(msg);
        this.name = "WrongPathError";
    }
}

class ProductsNotExistError extends Error {
    constructor(msg) {
        super(msg);
        this.name = "ProductsNotExistError";
    }
}

class ProductNotExistError extends Error {
    constructor(msg) {
        super(msg);
        this.name = "ProductNotExistError";
    }
}

module.exports = {
    EmailExistError,
    UsernameExistError,
    ConfirmPasswordMismatchError,
    PasswordLengthError,
    EmailNotExistError,
    PasswordMismatchError,
    TokenNotExistError,
    TokenTypeMismatchError,
    TokenUserNotExistError,
    UnauthUserError,
    QuerySyntaxError,
    WrongPathError,
    ProductsNotExistError,
    ProductNotExistError,
};
