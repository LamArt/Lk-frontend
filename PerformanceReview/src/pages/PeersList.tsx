import React from 'react';
import {Select, Card, Flex, Layout, Form, Button} from "antd";
import '../styles/Review.scss';
import '../styles/PeerList.scss';
import manPhoto from '../assets/man.png';
import womanPhoto from '../assets/woman.png';

type Peer = {
  name: string;
  image: string;
}

const peersListMock: Peer[] = [
  {
    name: 'Иван Дремин',
    image: manPhoto
  },
  {
    name: 'Антонова Агата',
    image: womanPhoto
  },
  {
    name: 'Шилова Софья',
    image: womanPhoto
  },
  {
    name: 'Любимов Алексей',
    image: manPhoto
  },
  {
    name: 'Лазарев Всеволод',
    image: manPhoto
  },
  {
    name: 'Краснова Мирослава',
    image: womanPhoto
  },
]

function PeersList() {
  return (
    <Layout className="review">
      <Layout.Content className="review-content">
        <h2 className="peerlist-header">Финальная оценка сотрудников</h2>
        <Flex vertical align={"center"}>
          <Form
            className='peerlist'
          >
            <Flex vertical gap={15} align={"center"}>
              {peersListMock.map((peer: Peer) => (
                <Card className="peerlist-card">
                  <Flex vertical={false} justify={'space-between'} className="peerlist-card-content">
                    <Flex vertical={false} gap={30} align={"center"}>
                      <img alt={peer.name} className='peerlist-image' src={peer.image}/>
                      <p className="peerlist-text">{peer.name}</p>
                    </Flex>
                    <Form.Item className='peerlist-select'>
                      <Select
                        placeholder="Не выбрано"
                        style={{ width: 200, color: "black" }}
                      >
                        <Select.Option value="Плохо (-)">Плохо (-)</Select.Option>
                        <Select.Option value="Могло быть лучше (+/-)">Могло быть лучше (+/-)</Select.Option>
                        <Select.Option value="Хорошо (+)">Хорошо (+)</Select.Option>
                        <Select.Option value="Классно (++)">Классно (++)</Select.Option>
                        <Select.Option value="Удивил (+++)">Удивил (+++)</Select.Option>
                        <Select.Option value="Один из лучших (++++)">Один из лучших (++++)</Select.Option>
                        <Select.Option value="Не выбрано">Не выбрано</Select.Option>
                      </Select>
                    </Form.Item>
                  </Flex>
                </Card>
              ))}
            </Flex>
            <Flex vertical={false} justify={"end"}>
              <Button type='primary' htmlType='submit' className='peerlist-button-save'>Сохранить</Button>
            </Flex>
          </Form>
        </Flex>
      </Layout.Content>
    </Layout>
  );
}

export default PeersList;