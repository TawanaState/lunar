import { ModelResponse } from "ollama";
import { ListResponse } from "ollama";
import ollama from "ollama/browser";
import React from "react";
import { ModelContext } from "../utils/contexts";
import { db } from "../utils/db";
import { History } from "./history";


export function Nav() {
    const hasRun = React.useRef(false);

    React.useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;
    }, [])

    return <nav className="flex flex-row justify-between items-center fixed top-0 py-2 px-12 w-full border-b border-b-gray-800 border-solid backdrop-blur-3xl">
        <div className="flex flex-row gap-8 items-center">
            <a href="#history-panel" className="mso">history</a>
            <History />
            <a href="/" className="mso">add</a>
        </div>
        <ModelSelect />
        <div className="gap-8 flex flex-row items-center">
            <button className="mso">settings</button>
        </div>
    </nav>
}

export function ModelSelect() {

    const [models, setModels] = React.useState<ModelResponse[]>([]);
    const context = React.useContext(ModelContext);
    const setModel = context ? context[1] : () => {};
    const LANGUAGE_MODEL = context ? context[0] : "";

    React.useEffect(() => {
        ollama.list().then((val:ListResponse) => {
            setModels(val.models);
        });
    }, [])

    const selectOnChange = (e:any) => {
        setModel(e.target.value);
        console.log("New model selected : " + e.target.value)
    }

    return <select defaultValue={LANGUAGE_MODEL} onChange={selectOnChange} className="p-2 bg-transparent text-white outline-none marker:hidden">
        {
            models.map((val:ModelResponse, k:number) => {
                return <option selected={val.name == LANGUAGE_MODEL} className="bg-muted" key={k + "--model-option"} value={val.name}>{
                    `${val.name} (${val.details.parameter_size})`
                }</option>
            })
        }
    </select>
}