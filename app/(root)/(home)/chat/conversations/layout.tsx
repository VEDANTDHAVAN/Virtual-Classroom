import ItemList from '@/components/chat/item-list/ItemList';
import React from 'react'

type Props = React.PropsWithChildren<{}>

const ConversationsLayout = ({children} : Props) => {
  return <>
   <ItemList title='Conversations'>Conversations Page</ItemList>
   {children}
  </>
}

export default ConversationsLayout;