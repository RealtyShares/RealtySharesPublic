.PHONY: run init clean

OUTDIR=out

run: scratchpad.ts
	mkdir -p ${OUTDIR} && tsc --lib es6 --outDir ${OUTDIR} scratchpad.ts && node ${OUTDIR}/scratchpad.js

init:
	npm i @types/node

clean:
	rm -rf ${OUTDIR}
