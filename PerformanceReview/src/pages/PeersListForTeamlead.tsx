import React from 'react';
import {Button, Card, Flex, Layout} from "antd";
import {useNavigate} from "react-router-dom";
import '../styles/Review.scss';
import '../styles/PeerList.scss';
import {Teammate, useGetTeammatesQuery} from "../store/reviewApi/reviewApi";
import manPhoto from "../assets/man.png";
import Menu from "host/Menu";



function PeersListForTeamlead() {
  const navigate = useNavigate()

  const {data: teammatesData} = useGetTeammatesQuery()
  const teammates = teammatesData?.teammates

  return (
    <Layout className="review">
      <Menu/>
      <Layout.Content className="review-content">
        <h2 className="peerlist-header">Финальная оценка сотрудников</h2>
        <Flex vertical align={"center"}>
          <Flex className='peerlist' vertical gap={15} align={"center"}>
            {teammates && teammates.map((peer: Teammate) => (
              <Card className="peerlist-card">
                <Flex vertical={false} justify={'space-between'} align={'center'} className="peerlist-card-content">
                  <Flex vertical={false} gap={30} align={"center"}>
                    <img alt={peer.last_name} className='peerlist-image' src={manPhoto}/>
                    <p className='peerlist-text'>{`${peer.first_name} ${peer.last_name}`}</p>
                  </Flex>
                  {/*//TODO: Сделать запрос формы от тимлида по коллеге, если есть заполненые данные, то true*/}
                  {/*<Button onClick={() => navigate(`${peer.name}`)} type='primary' className='peerlist-button'>Посмотреть оценку</Button>:*/}
                  <Button onClick={() => navigate(`${peer.id}`)} type='primary' htmlType='submit' className='peerlist-button'>Оценить</Button>
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