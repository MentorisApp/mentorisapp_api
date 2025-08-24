export enum PostgresErrorCode {
	UNIQUE_VIOLATION = "23505", // duplicate key value violates unique constraint
	FOREIGN_KEY_VIOLATION = "23503", // insert or update on table violates foreign key constraint
	NOT_NULL_VIOLATION = "23502", // null value in column violates not-null constraint
	CHECK_VIOLATION = "23514", // check constraint violation
	EXCLUSION_VIOLATION = "23P01", // exclusion constraint violation
	STRING_DATA_RIGHT_TRUNCATION = "22001", // string too long for column
	NUMERIC_VALUE_OUT_OF_RANGE = "22003", // numeric value out of range
	INVALID_TEXT_REPRESENTATION = "22P02", // invalid input syntax for type
	DIVISION_BY_ZERO = "22012", // division by zero
	DEADLOCK_DETECTED = "40P01", // deadlock detected
	SERIALIZATION_FAILURE = "40001", // serialization failure (for transactions)
	INVALID_FOREIGN_KEY = "42830", // invalid foreign key reference
}
