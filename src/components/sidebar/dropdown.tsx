'use client';

import { useAppState } from '@/lib/providers/state-provider';
import { AccordionItem } from '@radix-ui/react-accordion';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';
import { AccordionTrigger } from '../ui/accordion';
import EmojiPicker from '../global/emoji-picker';
import { updateFolder } from '@/lib/supabase/queries';
import { useToast } from '../ui/use-toast';

interface DropdownProps {
   title: string;
   id: string;
   listType : 'folder' | 'file' | 'native';
   iconId: string;
   children?: React.ReactNode;
   disabled?: boolean;
   customIcon?: React.ReactNode;
}

const Dropdown:React.FC<DropdownProps>= ({

  title,
  id,
  listType,
  iconId,
  children,
  disabled,
  ...props
}) => {  

    const supabase = createClientComponentClient();
    const { state, dispatch, workspaceId, folderId } = useAppState();
    const [isEditing, setIsEditing ] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const folderTitle: string | undefined = useMemo(() => {
        if(listType === 'folder'){
           const stateTitle = state.workspaces.find(
            workspace => workspace.id === workspaceId )
            ?.folders.find((folder) => folder.id === id)?.title;
            if(title===stateTitle || !stateTitle) return title;
            return  stateTitle;
        }
    }, [state, listType, workspaceId,, id, title]);

    const fileTitle: string | undefined = useMemo(() => {
        if(listType === 'file'){
           const fileAndFolderId = id.split('folder');
           const stateTitle = state.workspaces.find(
            workspace => workspace.id === workspaceId )
            ?.folders.find((folder) => folder.id === fileAndFolderId[0])
            ?.files.find((file) => file.id === fileAndFolderId[1])
            ?.title;
            if(title===stateTitle || !stateTitle) return title;
            return  stateTitle;
        }
    }, [state, listType, workspaceId, id, title]);


    const isFolder = listType === 'folder';
    const groupIdentifies = clsx(
        'dark:text-white whitespace-nowrap flex justify-between items-center w-full relative',
        {
            'group/folder': isFolder,
            "group/file": !isFolder,
        }
    );
    const onChangeEmoji = async(selectedEmoji:string) => {
        if(!workspaceId) return ;
        if(listType === "folder"){
        dispatch({
            type:'UPDATE_FOLDER', 
            payload: { workspaceId, folderId: id, folder: { iconId: selectedEmoji },
        
            },
        });
        const {data, error } = await updateFolder({iconId: selectedEmoji} , id);
        if (error){
           toast ({
            title : "Error",
            variant:"destructive",
            description: "Could not update the ",
           }); 
        } else {
            toast ({
             title : "Success",
             variant:"destructive",
             description: "Update emoji for the folder",
            }); 
         }
    }

    };
    const folderTitleChange = (e: any) => {
       const fid = id.split('folder');
       if(!workspaceId) return;
       if(fid.length === 1){
           dispatch({type:"UPDATE_FOLDER",
           payload:{
             folder:{title},folderId:fid[0], workspaceId,
           },
         });
       }
    };
    const fileTitleChange = (e: any) => {

       const fid = id.split('folder');
       if(fid.length === 2 && fid[1]) {
        //in progress 

       }
    };


    const listStyles = useMemo(() => clsx('relative', {
    'border-none text-md': isFolder,
     'border-none ml-6 text-[16px] py-1': !isFolder,
    }),
   [isFolder]
    );

    const navigatePage = (accordionId: string, type: string) => {

      if (type === 'folder'){
        router.push('/dashboard/${worspaceId}/${accordionId}');
      }
      if (type === 'file'){  
        router.push('/dashboard/${worspaceId}//${folderId}${accordionId}');
      }
      
    };
    
    const handleDoubleClick = () => {
       setIsEditing(true);
    };
    const handleBlur = async () => {
      setIsEditing(false);
      const fId = id.split('folder');
      if (fId?.length === 1){
        if (!folderTitle) return ;
        await updateFolder({ title }, fId[0]);
        }
     if(fId.length === 2 && fId[1]){
        if(!fileTitle) return ;
         //in progress 
     }
    
    };

  return (
  <AccordionItem 
    value={id} 
    className={listStyles}
    onClick={(e) => {
      e.stopPropagation();
      navigatePage(id, listType);
  }}
  >
    <AccordionTrigger 
      id={listType}
      className='hover:no-underline
      p-2
      dark:text-muted-foreground
      text-sm'
      disabled={listType === 'file'}
      >
        <div className={groupIdentifies}>
            <div className="
             flex 
             gap-4
             items-center
             justify-center 
             overflow-hidden 
            ">
                <div className="relative">
                    <EmojiPicker getValue={onChangeEmoji}>{iconId}</EmojiPicker>
                </div>
                <input type="text" 
                  value={listType === "folder" ? folderTitle : fileTitle} 
                  className={`outline-none overflow-hidden w-[140px] text-Neutrals-7'${
                    isEditing 
                      ? 'bg-muted cursor-text'
                      : 'bg-transparent cursor-pointer'
                 }`}
                 readOnly={!isEditing}
                 onDoubleClick={handleDoubleClick}
                 onBlur={handleBlur}
                 onChange={listType === 'folder' ? folderTitleChange : fileTitleChange}
                />
            </div>
            {listType === "folder" && !isEditing && <></>}
        </div>
    </AccordionTrigger>
    
  </AccordionItem>
  );
};
export default Dropdown;
