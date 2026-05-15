package core

type CvedbError struct {
	IsCvedbError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewCvedbError(code string, msg string, ctx *Context) *CvedbError {
	return &CvedbError{
		IsCvedbError: true,
		Sdk:              "Cvedb",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *CvedbError) Error() string {
	return e.Msg
}
