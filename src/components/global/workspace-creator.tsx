'use client'
import { User, workspace } from '@/lib/supabase/supabase.types';
import React, { useState } from 'react';
import { useSupabaseUser } from '@/lib/providers/supabase-user-provider';
import { useToast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Lock, Plus, Share } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";


const WorkspaceCreator = () => {
    const { user } = useSupabaseUser();
    const { toast } = useToast();
    const router = useRouter();
    const [permissions, setPermissions] = useState('private');
    const [title, setTitle] = useState('');
    const [collaborators, setCollaborators] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);
  
    const addCollaborator = (user: User) => {
      setCollaborators([...collaborators, user]);
    };
  
    const removeCollaborator = (user: User) => {
      setCollaborators(collaborators.filter((c) => c.id !== user.id));
    };


    return (
         <div className="flex gap-4 flex-col">
            <div>
                <Label htmlFor='name' className="text-sm text-muted-foreground">
                    Name
                </Label>
                <div className='flex
                           justify-center 
                           items-center
                           gap-2
                '>
                    <Input name="name" value={title} placeholder='workspace Name' onChange={(e)=>{setTitle(e.target.value);}} />
                </div>
            </div>
            <>
              <Label htmlFor='permissions' className='text-sm
                                                      text-muted-foreground'>
                  Permission
              </Label>
              <select
                onValueChange={(val) => {setPermissions(eval);}}
                defaultValue={permissions}>
                  <SelectTrigger className='w-full h-26 -mt-3'> 
                     <SelectValue/>
                  
                  </SelectTrigger>
                  <SelectContent >

                      <SelectGroup>

                          <SelectItem value="private">
                              <div className='p-2
                                flex
                                gap-4
                                justify-center
                                items-center
                              
                              '>
                                  <Lock />
                                  <article className='text-left flex flex-col'>
                                    <span>Private</span>
                                    <p>
                                    Your workspace is private to you. You can choose to share
                                    it later.
                                    </p>
                                  </article>
                              </div>
                          </SelectItem>
                          <SelectItem value="shared">
                                <div className="p-2 flex gap-4 justify-center items-center">
                                   <Share></Share>
                                   <article className="text-left flex flex-col">
                                     <span>Shared</span>
                                     <span>You can invite collaborators.</span>
                                   </article>
                                </div>
                          </SelectItem>

                      </SelectGroup>

                  </SelectContent>
              </select>
            </>
         </div>)
};
export default WorkspaceCreator;