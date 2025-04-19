import React, { useState } from 'react';
import ollama from 'ollama/browser';
import { writeTextFile, BaseDirectory } from '@tauri-apps/plugin-fs';
import { openPath } from '@tauri-apps/plugin-opener';
import { appLocalDataDir, join } from '@tauri-apps/api/path';

interface IModel {
  name: string;
  description: string;
  sizes : string[];
}

let OLLAMA_PULL_PROCESS = null;

export default function ModelPuller() {
  const [isOpen, setIsOpen] = useState(false);
  const [models, setModels] = useState([]);
  const [query, setQuery] = useState('');

  React.useEffect(() => {
    fetch("/ollama-models.json").then(res => {
      res.json().then(result => {
        setModels(result);
      })
    });
  }, [])

  const pullModel = async (model_name:string) => {
    // 1. Compose batch script
    const batContent = `@echo off
    ollama pull ${model_name}
    pause
    `;
    // 2. Define .bat filename
    const filename = `pull-${model_name.replace(":", '-')}.bat`;
    // 3. Write it to AppConfig (or AppData)
    await writeTextFile(filename, batContent, {
      baseDir: BaseDirectory.AppLocalData,
      create: true,
      append: false
    });

    // 4. Open it—Windows will launch a CMD window
    let localdata_dir = await appLocalDataDir();
    let filepath = await join(localdata_dir, filename);
    await openPath(filepath);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-indigo-800/50 text-white px-4 py-2 rounded-md"
      >
        Download Model
      </button>
    );
  }

  
  return (
    <div className="fixed inset-0 z-20 bg-black/50 flex items-center justify-center w-[100vw] h-[100vh]">
      <div className="bg-muted p-6 rounded-md shadow-lg w-[50vw] top-0">
        <h2 className="text-2xl font-bold mb-4 flex flex-row items-center justify-between">
          Models
          <button className='rounded-md mso' onClick={() => setIsOpen(false)}>close</button>
        </h2>
        <input className='outline-none border border-gray-600 p-1.5 px-2 w-full bg-transparent rounded-md' type="search" placeholder='Search here...' onInput={(e) => {setQuery(e.target.value)}} />
        <ul className='flex flex-col gap-3 max-h-[50dvh] overflow-y-auto'>
          {
              models.filter((v:IModel) => {return v.name.includes(query)}).map((v:IModel, k:number) => {
                return <li key={k + "--model"} className="flex flex-col gap-1 border-b border-gray-500/50 py-6">
                  <h3 className='text-xl'>{v.name}</h3>
                  <p className='text-muted'>{v.description}</p>
                  <div className="flex flex-row gap-2">
                    {
                      v.sizes.map((size, k) => {
                        return <button key={k + "--size"} className="bg-indigo-600/10 text-white px-2 py-1 rounded-md text-sm" onClick={() => {
                          pullModel(v.name + ":" + size);
                        }}>{size} <span className="mso !text-sm">download</span></button>
                      })
                    }
                  </div>
                </li>
              })
          }
        </ul>

      </div>
    </div>
  );
}