import React from 'react';
import {Button, Card, Flex, Layout} from "antd";
import {peersListMock} from "../mocks/mocks";
import {Peer} from "../types/peer";
import {useNavigate} from "react-router-dom";
import '../styles/Review.scss';
import '../styles/PeerList.scss';



function PeersListForTeamlead() {
  const navigate = useNavigate()

  return (
    <Layout className="review">
      <Layout.Content className="review-content">
        <h2 className="peerlist-header">Финальная оценка сотрудников</h2>
        <Flex vertical align={"center"}>
          <Flex className='peerlist' vertical gap={15} align={"center"}>
            {peersListMock.map((peer: Peer) => (
              <Card className="peerlist-card">
                <Flex vertical={false} justify={'space-between'} align={'center'} className="peerlist-card-content">
                  <Flex vertical={false} gap={30} align={"center"}>
                    <img alt={peer.name} className='peerlist-image' src={peer.image}/>
                    <p className='peerlist-text'>{peer.name}</p>
                  </Flex>
                  {/*//TODO: Сделать запрос формы от тимлида по коллеге, если есть заполненые данные, то true*/}
                  {/*<Button onClick={() => navigate(`${peer.name}`)} type='primary' className='peerlist-button'>Посмотреть оценку</Button>:*/}
                  <Button onClick={() => navigate(`${peer.name}`)} type='primary' htmlType='submit' className='peerlist-button'>Оценить</Button>
                </Flex>
              </Card>
            ))}
          </Flex>
        </Flex>
      </Layout.Content>
    </Layout>
  );
}

export default PeersListForTeamlead;