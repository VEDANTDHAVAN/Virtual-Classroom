import React, { ReactNode } from 'react'
import {
  Dialog,
  DialogContent
} from "@/components/ui/dialog"
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'

interface MeetingModalProps {
  isOpen: boolean, onClose: () => void, 
  title: string, className?: string, children?: ReactNode,
  handleClick?: () => void, buttonText?: string,
  image?: string, buttonIcon?: string 
}

const MeetingModal = ({isOpen, onClose, title, className, children, handleClick, buttonText, image, buttonIcon}: MeetingModalProps) => {
  return (
   <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className='flex w-full max-w-[520px] flex-col gap-6 border-none bg-blue-950 px-6 py-8 text-white'>
     <div className='flex flex-col gap-6'>
      {image && (
        <div className='flex justify-center'>
         <Image src={image} alt='image' width={72} height={72} /> 
        </div>
      )}
      <h1 className={cn('text-3xl font-bold leading-[42px]', className)}>{title}</h1>
      {children}
      <Button className='bg-blue-500 focus-visible:ring-0 focus-visible:ring-offset-0 cursor-pointer' onClick={handleClick}>
        {buttonIcon && (
            <Image src={buttonIcon} alt='Button Icon' width={14} height={14} />
        )} &nbsp;
        {buttonText || 'Schedule Meeting'}
      </Button>
     </div>
    </DialogContent>
   </Dialog>
 )
}

export default MeetingModal