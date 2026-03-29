"use client";

import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Post, USERS } from "../types/posts.types";
import { usePostsStore } from "../store/posts.store";
import { useCreatePosts } from "../hooks/useCreatePosts";
import { useEditPosts } from "../hooks/useEditPosts";
import { useEffect } from "react";

type PostForm = {
  title: string;
  body: string;
  userId: number;
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dataEdit?: Post;
};

export function CreatePostModal({
  open,
  onOpenChange,
  dataEdit,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
    setValue
  } = useForm<PostForm>({
    defaultValues: dataEdit ? {
      userId: dataEdit.userId,
      title: dataEdit.title,
      body: dataEdit.body
    } : {
      userId: 0
    }
  });

  const {mutate} = useCreatePosts();
  const {mutate: mutateEdit} = useEditPosts();

  useEffect(() => {
    if (dataEdit) {
      setValue('body', dataEdit.body);
      setValue('title', dataEdit.title);
      setValue('userId', dataEdit.userId);
    }
  }, [dataEdit])

  const onSubmit = (data: PostForm) => {
    if (!isValid) return;
    if (dataEdit) {
      mutateEdit({...data, id: dataEdit.id})
    } else {
      mutate(data);
    }
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{dataEdit ? 'Editar Publicacion' : 'Crear Publicacion'}</DialogTitle>
          <DialogDescription>
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >

          <div>
            <Input
              placeholder="Titulo"
              {...register("title", {
                required: "El titulo es requerido",
              })}
            />
            {errors.title && (
              <p className="text-sm text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <Textarea
              placeholder="Descripcion"
              {...register("body", {
                required: "La descripcion es requerida",
              })}
            />
            {errors.body && (
              <p className="text-sm text-red-500">
                {errors.body.message}
              </p>
            )}
          </div>

          <div>
            <select
              aria-label="Filtrar por rol"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none"
              {...register("userId", { required: "El usuario es requerido", validate: (value) => value !=0 || 'El usuario es requerido'})}
              
            >
              <option value="0">
                  Selecciona un usuario
              </option>
              {USERS.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {errors.userId && (
              <p className="text-sm text-red-500">
                {errors.userId.message}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>

            <Button type="submit" disabled={isSubmitting}>
              {dataEdit ? 'Editar' : 'Crear'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}